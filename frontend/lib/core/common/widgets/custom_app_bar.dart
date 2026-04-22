import 'package:flutter/material.dart';
import 'package:frontend/core/theme/colors.dart';

class CustomAppBar extends StatelessWidget implements PreferredSizeWidget {
  final bool isSliver;
  final Widget? title;
  final Widget? leading;
  final List<Widget>? actions;
  final bool showProfileIcon;
  final ImageProvider<Object>? profileLogo;
  final VoidCallback? onProfileTap;
  final bool showBackButton;
  final VoidCallback? onBackPressed;
  final double expandedHeight;
  final bool floating;
  final bool pinned;
  final EdgeInsetsGeometry titlePadding;
  final ImageProvider<Object>? backgroundImage;
  final Color backgroundColor;

  const CustomAppBar({
    super.key,
    this.isSliver = false,
    this.title,
    this.leading,
    this.actions,
    this.showProfileIcon = true,
    this.profileLogo,
    this.onProfileTap,
    this.showBackButton = false,
    this.onBackPressed,
    this.expandedHeight = kToolbarHeight,
    this.floating = true,
    this.pinned = true,
    this.titlePadding = const EdgeInsets.symmetric(horizontal: 20, vertical: 15),
    this.backgroundImage,
    this.backgroundColor = AppColors.primaryDark,
  });

  const CustomAppBar.sliver({
    super.key,
    this.title,
    this.leading,
    this.actions,
    this.showProfileIcon = true,
    this.profileLogo,
    this.onProfileTap,
    this.showBackButton = false,
    this.onBackPressed,
    this.expandedHeight = 180,
    this.floating = true,
    this.pinned = true,
    this.titlePadding = const EdgeInsets.symmetric(horizontal: 20, vertical: 15),
    this.backgroundImage,
    this.backgroundColor = AppColors.primaryDark,
  }) : isSliver = true;

  @override
  Widget build(BuildContext context) {
    final resolvedLeading = _buildLeading(context);
    final resolvedActions = _buildActions();

    if (isSliver) {
      return SliverAppBar(
        expandedHeight: expandedHeight,
        floating: floating,
        pinned: pinned,
        elevation: 0,
        automaticallyImplyLeading: false,
        backgroundColor: backgroundColor,
        leading: resolvedLeading,
        actions: resolvedActions,
        flexibleSpace: FlexibleSpaceBar(
          background: Container(
            decoration: BoxDecoration(
              color: backgroundColor,
              image: backgroundImage == null
                  ? null
                  : DecorationImage(image: backgroundImage!, fit: BoxFit.cover),
            ),
          ),
          titlePadding: titlePadding,
          title: title,
        ),
      );
    }

    return AppBar(
      automaticallyImplyLeading: false,
      title: title,
      leading: resolvedLeading,
      actions: resolvedActions,
      elevation: 0,
      backgroundColor: backgroundColor,
    );
  }

  Widget? _buildLeading(BuildContext context) {
    if (leading != null) {
      return leading;
    }

    if (!showBackButton) {
      return null;
    }

    return IconButton(
      onPressed: onBackPressed ?? () => Navigator.of(context).maybePop(),
      icon: const Icon(Icons.arrow_back_ios_new),
    );
  }

  List<Widget>? _buildActions() {
    final resolved = <Widget>[...?actions];

    if (showProfileIcon) {
      resolved.add(
        IconButton(
          onPressed: onProfileTap,
          icon: CircleAvatar(
            radius: 14,
            backgroundColor: Colors.white.withValues(alpha: 0.2),
            backgroundImage: profileLogo,
            child: profileLogo == null
                ? const Icon(Icons.person, size: 16, color: Colors.white)
                : null,
          ),
        ),
      );
    }

    if (resolved.isEmpty) {
      return null;
    }

    return resolved;
  }

  @override
  Size get preferredSize => Size.fromHeight(isSliver ? expandedHeight : kToolbarHeight);
}
